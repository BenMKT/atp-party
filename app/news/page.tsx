'use client';

import { supabase } from '@/app/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { News } from '../lib/definitions';
import NavBar from '../ui/top-navbar';
import { fetchNews } from '../lib/data';
import { createNews, deleteNews } from '../lib/actions';
import { useSession } from 'next-auth/react';
import { BsFillTrash3Fill } from 'react-icons/bs';

// set the CDN URL
const CDNURL =
  'https://hgtovaupiuxajqlkjdfg.supabase.co/storage/v1/object/public/news/';

// create a component for the news page
const NewsPage = () => {
  // get the session object from the useSession hook
  const session = useSession().data;

  // create states for the file, video link, and news feeds
  const [file, setFile] = useState<File | null>(null);
  const [videoLink, setVideoLink] = useState<string>('');
  const [news, setNews] = useState<News[]>([]);

  // handle the file change event and set the file state to the selected file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // handle the video link change event and set the video link state
  const handleVideoLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoLink(e.target.value);
  };

  // fetch all news files from the database on page load
  useEffect(() => {
    getNews();
  }, []);

  // fetch all news files from the database
  const getNews = async () => {
    try {
      const feeds = await fetchNews();
      console.log(feeds);
      // format the feeds to display the date in the correct format as string
      const formattedFeeds = feeds.map((feed: any) => ({
        ...feed,
        createdAt: new Date(feed.createdAt).toISOString(), // Convert to string
      }));
      setNews(formattedFeeds);
    } catch (error) {
      console.error(error);
      toast.error('Error grabbing files from the database');
    }
  };

  // handle the form submit event to create a news feed
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // variable to store the file path
    let fileUrl = '';
    // check if a file was selected or a video link was provided
    if (file) {
      // upload the file to a supabase storage bucket and get the file path through destructuring
      const fileName = `${uuidv4()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('news')
        .upload(fileName, file);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success('File uploaded successfully!');
      fileUrl = `${CDNURL}${fileName}`;
    } else if (videoLink) {
      fileUrl = videoLink;
    } else {
      toast.error('Please select a file or provide a video link.');
      return;
    }
    // get the rest of the form data from the form
    const formElement = document.getElementById('newsForm') as HTMLFormElement;
    if (!formElement) {
      toast.error('Form element not found.');
      return;
    }
    const formData = new FormData(formElement);
    // create a news feed with the form data and the file path from the uploaded file or video link
    createNews(fileUrl, formData)
      .then(() => {
        toast.success('News Feed created successfully!');
        getNews();
        // Clear the form fields
        setFile(null);
        setVideoLink('');
        formElement.reset();
      })
      .catch((error: Error) => {
        toast.error('Error creating news feed.');
        console.error(error);
      });
  };

  // delete a news feed from the database
  const handleDelete = async (id: string) => {
    try {
      await deleteNews(id);
      setNews(news.filter((newsItem) => newsItem.id !== id));
      toast.success('News Feed deleted successfully!');
    } catch (error) {
      toast.error('Error deleting news feed.');
      console.error(error);
    }
  };

  // Function to convert YouTube URL to embed URL to display in iframe
  const getEmbedUrl = (url: string) => {
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|live)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  };

  return (
    <main className=" mt-14 min-h-screen w-full bg-sky-100 p-4">
      <NavBar />
      {/* banner */}
      <section className="relative mb-4 flex h-96 items-center justify-center text-center">
        <div className="absolute inset-0 bg-[url(/crowd.jpg)] blur-sm filter"></div>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-white">
          <p className="mb-5 text-2xl font-bold">Information about the party</p>
          <hr className="mx-auto w-1/3" />
          <p className="mt-4 text-4xl font-bold">News & Events</p>
        </div>
      </section>
      {/* conditionally render feeds upload form */}
      <section>
        {session?.user?.role === 'ADMIN' || session?.user?.role === 'STAFF' ? (
          <form id="newsForm" onSubmit={handleSubmit} className="my-4">
            {/* Upload file field */}
            <div className="md:flex md:gap-4">
              <div className="md:w-1/2">
                <label
                  htmlFor="newsFeed"
                  className="block text-sm font-medium text-gray-900"
                >
                  Upload your file here!
                </label>
                <input
                  id="newsFeed"
                  name="feed"
                  type="file"
                  onChange={handleFileChange}
                  className="mt-2 block w-full rounded-md border border-zinc-500 p-2 focus:border-primary focus:outline-none focus:ring-primary"
                />
              </div>
              {/* Video link field */}
              <div className="md:w-1/2">
                <label
                  htmlFor="videoLink"
                  className="mt-2 block text-sm font-medium text-gray-900 md:mt-0"
                >
                  Or provide a video link here!
                </label>
                <input
                  id="videoLink"
                  name="videoLink"
                  type="url"
                  value={videoLink}
                  onChange={handleVideoLinkChange}
                  placeholder="https://example.com/video"
                  className="mt-2 h-11 w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-black shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                />
              </div>
            </div>
            {/* file description field */}
            <div>
              <label
                htmlFor="description"
                className="mt-2 block text-sm font-medium text-gray-900"
              >
                File description
              </label>
              <input
                id="description"
                name="description"
                type="text"
                placeholder="File description"
                required
                className="mt-2 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-black shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              />
            </div>
            {/* upload button */}
            <button
              type="submit"
              className="mt-2 block h-[48px] rounded-lg bg-[#1B5CFE] px-3 text-sm font-bold text-white hover:scale-105 active:-scale-95 md:w-1/6"
            >
              Upload
            </button>
          </form>
        ) : null}
      </section>
      {/* display all news feeds */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {news
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .map((newsItem) => (
            <div
              key={newsItem.id}
              className="space-y-3 rounded-md bg-white p-4 shadow-lg shadow-[#1B5CFE]"
            >
              {/* delete button */}
              <div className="flex justify-end">
                {session?.user?.role === 'ADMIN' ||
                session?.user?.role === 'STAFF' ? (
                  <button
                    onClick={() => handleDelete(newsItem.id)}
                    className="text-[#1B5CFE] hover:scale-150"
                  >
                    <BsFillTrash3Fill size={20} />
                  </button>
                ) : null}
              </div>
              {/* news feeds */}
              <iframe
                className="w-full rounded-md border-none"
                height="380px"
                src={getEmbedUrl(newsItem.feed)}
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
              <p className="font-semibold text-gray-700">
                {newsItem.description}
              </p>
            </div>
          ))}
      </section>
    </main>
  );
};

export default NewsPage;

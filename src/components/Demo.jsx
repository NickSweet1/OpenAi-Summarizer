import { useState, useEffect } from 'react';
import { copy, linkIcon, loader, tick } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {
  const [article, setArticle] = useState({
    url: '', 
    summary: '',
  })

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();


  useEffect(() => {
    const articlesFromLocalStorage = json.parse(
      localStorage.getItem('articles')
    )

    if(articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
   }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {data } = await getSummary({ articleUrl: article.url });
    alert('Submitted');

    if(data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
      console.log(newArticle);
    }
  }

  return (
    <section className='mt-16 w-full max-w-xl'>
      <div className='flex flex-col w-full gap-2'>
        <form className='relative flex justify-center items-center' onSubmit={handleSubmit}>
          <img
            src={linkIcon}
            alt='Link Icon'
            className='absolute left-0 my-2 ml-3 w-5'
          />
          <input
            type="url"
            placeholder='Enter a URL'
            value={article.url}
            onChange={(e) => setarticle({ ...article, url: e.target.value})}
            required
            className="url_input peer-focus:border-gray-700 peer-focus:tex-gray-700"
          />
          <button 
            type="submit"
            className='submit_btn'
          >
            Send
          </button>
        </form>

        {/* Browser URL Search History */}
        <div className='flex flex-col gap-1m max-h-60 overflow-y-auto'>
          {allAritlces.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className='link-card'
              >
                <div className='copy-btn'>
                  <img 
                    src={copy}
                    alt='copy icon'
                    className='w-[40%] h-[40%] object-contain'
                  />
                  <p className='"flex-1 font-satoshi text-blue-700 font-mediun text-sm truncate'>{item.url}</p>
                </div>
                ))}
              </div>
        {/* Display Results */}
      </div>
    </section>
  )
}

export default Demo;
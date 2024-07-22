import './Blog.css';
import { Tabs } from 'antd';
const textAll =[
  {
    id:1,
    title:'Valentines Day Date Ideas',
    text:'Whether you’re celebrating this holiday with your husband or making it a Galentine’s Day with your BFF, we have the best ideas to make this Valentine’s Day one to remember!',
    img:'/imgtext-all1.webp',
  },
  {
    id:2,
    title:'New Years Eve Looks That Shine',
    text:'Ring in the New Year with a gorgeous jewelry look from Diamonds Direct!',
    img:'/imgtext-all2.webp',
  },
  {
    id:3,
    title:'Holiday Gift Guide: Unwrap Shining Gifts For Every Loved One!',
    text:'Holiday gifts from Diamonds Direct that will stand the test of time.',
    img:'/imgtext-all3.webp',
  },
  {
    id:4,
    title:'Best Date Spots In New Orleans',
    text:'It’s hard to go wrong when planning a date night in New Orleans. Between the music, the food, the festivals, and the tone of the city, it’s never hard to find something to do. But, ' +
      'we’ve narrowed down some of our favorite locales for Diamonds Direct’s “best date-night spots in the Big Easy.”',
    img:'/imgtext-all4.webp',
  },
  {
    id:5,
    title:'Popular Wedding Traditions Explained',
    text:'What do you think of when you think of wedding planning? A white dress, flowers, and a first dance may come to mind.',
    img:'/imgtext-all5.webp',
  },
  {
    id:6,
    title:'Setting Styles',
    text:'You have your diamond shape picked out, and now it’s time to choose the setting',
    img:'/imgtext-all6.webp',
  }
]
const textDiamonds=[
  {
    id:1,
    title:'Valentines Day Date Ideas',
    text:'Whether you’re celebrating this holiday with your husband or making it a Galentine’s Day with your BFF, we have the best ideas to make this Valentine’s Day one to remember!',
    img:'/imgtext-all1.webp',
  },
  {
    id:2,
    title:'Setting Styles',
    text:'You have your diamond shape picked out, and now it’s time to choose the setting',
    img:'/imgtext-all6.webp',
  }
]
const textJewelry=[
  {
    id:1,
    title:'New Years Eve Looks That Shine',
    text:'Ring in the New Year with a gorgeous jewelry look from Diamonds Direct!',
    img:'/imgtext-all2.webp',
  },
  {
    id:2,
    title:'Holiday Gift Guide: Unwrap Shining Gifts For Every Loved One!',
    text:'Holiday gifts from Diamonds Direct that will stand the test of time.',
    img:'/imgtext-all3.webp',
  },
]
const textEngagement=[
  {
    id:1,
    title:'Best Date Spots In New Orleans',
    text:'It’s hard to go wrong when planning a date night in New Orleans. Between the music, the food, the festivals, and the tone of the city, it’s never hard to find something to do. But, ' +
      'we’ve narrowed down some of our favorite locales for Diamonds Direct’s “best date-night spots in the Big Easy.”',
    img:'/imgtext-all4.webp',
  },
  {
    id:2,
    title:'Popular Wedding Traditions Explained',
    text:'What do you think of when you think of wedding planning? A white dress, flowers, and a first dance may come to mind.',
    img:'/imgtext-all5.webp',
  },
  {
    id:3,
    title:'Setting Styles',
    text:'You have your diamond shape picked out, and now it’s time to choose the setting',
    img:'/imgtext-all6.webp',
  }
]
const items = [
  {
    key: '1',
    label: 'All',
    children: <div className='text-all'>
      {textAll.map((item)=> {
          return(
            <div key={item.id} >
              <img src={item.img} height={200} width={350}/>
              <div className='text-all-item'>
                <h5>{item.title}</h5>
                <p>{item.text}</p>
              </div>
            </div>
          )
      })}
    </div>,
  },
  {
    key: '2',
    label: 'Diamonds',
    children: <div className='text-all'>
      {textDiamonds.map((item)=> {
        return(
          <div key={item.id} >
            <img src={item.img} height={200} width={350}/>
            <div className='text-all-item'>
              <h5>{item.title}</h5>
              <p>{item.text}</p>
            </div>
          </div>
        )
      })}
    </div>,
  },
  {
    key: '3',
    label: 'Jewelry',
    children: <div className='text-all'>
      {textJewelry.map((item)=> {
        return(
          <div key={item.id} >
            <img src={item.img} height={200} width={350}/>
            <div className='text-all-item'>
              <h5>{item.title}</h5>
              <p>{item.text}</p>
            </div>
          </div>
        )
      })}
    </div>,
  },
  {
    key: '4',
    label: 'Engagement Guide',
    children: <div className='text-all'>
      {textEngagement.map((item)=> {
        return(
          <div key={item.id} >
            <img src={item.img} height={200} width={350}/>
            <div className='text-all-item'>
              <h5>{item.title}</h5>
              <p>{item.text}</p>
            </div>
          </div>
        )
      })}
    </div>,
  },
];
const Blog = () => {
  return (
    <div id='blog'>
      <div className='image-container'>
        <img src='/blog.webp' alt='Blog'/>
        <h1>Diamonds Direct Blog</h1>
      </div>
      <div className='protect'>
        <h2>
          3 Ways To Protect Your Jewelry This Summer
        </h2>
        <button>READ MORE</button>
      </div>
      <div className='tab-blog'>
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
};

export default Blog;

import React from "react";
import "./cover.css";


const songFeeder= [
  {'Name': 'Physical Education', 'Artist': 'Animals as Leaders', 'URL':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg', 'likes': '88.000', 'plays': '1M'},
  {'Name': 'Para Mexer', 'Artist': 'Animals as Leaders', 'URL':'https://dummyimage.com/400x400/000/fff', 'likes': '88.000', 'plays': '1M'},
  {'Name': 'Street Fighter Mas', 'Artist': 'Kamasi Washington', 'URL':'https://avatarfiles.alphacoders.com/782/78200.png', 'likes': '88.000', 'plays': '1M'},
  {'Name': 'Gone', 'Artist': 'Anderson Paak', 'URL':'https://www.fetchdvm360.com/wp-content/uploads/2018/11/veterinary-behavior-block-400x400.jpg', 'likes': '88.000', 'plays': '1M'},
  {'Name': 'Moments', 'Artist': 'Kenneth Whalum', 'URL':'https://i.pinimg.com/originals/54/6d/41/546d41d7edb34085b69b7c29de441232.jpg', 'likes': '88.000', 'plays': '1M'},
  {'Name': 'Esentielles', 'Artist': 'Ibrahim Maalouf', 'URL':'https://pbs.twimg.com/profile_images/446356636710363136/OYIaJ1KK_400x400.png', 'likes': '88.000', 'plays': '1M'},
  {'Name': 'Nakamarra', 'Artist': 'Hiatus Kaiyote', 'URL':'https://gradle.org/images/gradle-400x400.png', 'likes': '88.000', 'plays': '1M'},
  {'Name': 'Drunk', 'Artist': 'Sungazer', 'URL':'https://jethromanagement.biz/wp-content/uploads/2017/10/instagram-logo-vector-download-400x400.jpg', 'likes': '88.000', 'plays': '1M'},
  {'Name': 'Boom Bap', 'Artist': 'Woo Park', 'URL':'https://archive-media-0.nyafuu.org/vp/image/1508/39/1508395728106.jpg', 'likes': '88.000', 'plays': '1M'},
  {'Name': 'Modern Value', 'Artist': 'Victoria', 'URL':'https://www.mitrefinch.com.au/wp-content/uploads/sites/6/2018/09/piggy-circle-1-400x400.png', 'likes': '88.000', 'plays': '1M'},
  {'Name': 'Tour', 'Artist': 'Evan Marien', 'URL':'https://s3.ap-south-1.amazonaws.com/isupportcause/uploads/overlay/isupportimg_1508181573419.png', 'likes': '88.000', 'plays': '1M'},
]

export default function CoverInfo() {

  const rand = Math.floor(Math.random()*10)

  return (
    <div className='entity'>
      <a href='#'>
        <img
            className='image'
          src={songFeeder[rand].URL}
          alt='cover'
        />
      <span className='footer'>
          <p>{songFeeder[rand].Name}</p>
          <p>{songFeeder[rand].Artist}</p>
          <div className='numbers'>
            <p>Plays: {songFeeder[rand].plays}</p>
            <p>Likes: {songFeeder[rand].likes}</p>
           </div>
      </span>
      </a>
    </div>
  );
}

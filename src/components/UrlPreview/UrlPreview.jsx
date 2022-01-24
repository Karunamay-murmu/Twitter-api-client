// import React from "react";
// import PropTypes from "prop-types";

// // const trimText = (tweet) => {
// //     let { text, entities } = tweet;
// //     const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/im;
// //     const hashtagRegex = /(#[a-z\d-_]+)/im;
// //     if (entities) {
// //         for (const [key, value] of Object.entries(entities)) {
// //             if (value.length) {
// //                 value.forEach(val => {
// //                     if (key === "hashtags") {
// //                         text = text.replace(hashtagRegex, val.tag);
// //                     } else if (key === "urls") {
// //                         text = text.replace(urlRegex, "");
// //                         // text = text.replace(urlRegex, `<a href="${val.url}" target="_blank" rel="noopener noreferrer">${val.display_url}</a>`);
// //                         if (val?.title || val?.description) {
// //                             return UrlPreview(tweet);
// //                         }
// //                     } else if (key === "mentions") {
// //                         let html = `<a href="/${val.username}" target="_blank" rel="noopener noreferrer">@${val.username}</a>`;
// //                         if (tweet?.in_reply_to_user_id) {
// //                             text = text.replace(`@${val.username}`, "");
// //                         }
// //                         text = text.replace(`@${val.username}`, html);
// //                     }
// //                 });
// //             }
// //         }
// //     }
// //     return text.trim();
// // };


// function UrlPreview({ tweet: { entities: { urls } } }) {
// 	return (
// 		urls?.map(url => (
// 			<div>
// 				<div>image</div>
// 				<div>
// 					<div>{url.display_url}</div>
// 					<div>{url.title}</div>
// 					<div>{url.description}</div>
// 				</div>
// 			</div>
// 		))
// 	)
// }

// // function TweetText(tweet) {
// //     return (
// //         tweet?.in_reply_to_user_id && tweet?.in_reply_to_user_id !== tweet?.user?.id && (
// //             <div className={styles.post__mentions__wrapper}>
// //                 <span className={styles.post__mentions__type}>
// //                     Replying to
// //                 </span>
// //                 <div className={styles.post__mentions}>
// //                     {
// //                         tweet?.entities?.mentions?.map(user => (
// //                             <a key={user.id} href={`/${user.username}`} target="_blank" rel="noopener noreferrer">@{user.username}</a>
// //                         ))
// //                     }
// //                 </div>
// //             </div>
// //         )
// //     )
// // }


// UrlPreview.PropTypes = {
// 	url: PropTypes.object.isRequired,
// 	className: PropTypes.string
// };

// export default UrlPreview;

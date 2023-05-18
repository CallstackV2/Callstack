import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CommentBody(props) {
//   const dispatch = useDispatch();
//   const currentComments = useSelector(
//     (state) => state.userReducer.currentComments
//   );

//   const commentsArray = [];

  // console.log(`currentComments.length: ${currentComments.length}`);
  // console.log(`typeof currentComments: ${typeof currentComments}`);
  // console.log(
  //   `Array.isArray(currentComments): ${Array.isArray(currentComments)}`
  // );
  // console.log(`currentComments[0]: ${currentComments}`);
  // console.log(`Object.keys(currentComments): ${Object.keys(currentComments)}`);
  // console.log(
  //   `Object.values(currentComments): ${Object.values(currentComments)}`
  // );
  // console.log(
  //   `Array.isArray(currentComments[0]): ${Array.isArray(currentComments[0])}`
  // );
  // const arr = currentComments[0];
  // console.log(`arr: ${arr}`);
  // console.log(`Array.isArray(arr): ${Array.isArray(arr)}`);

//   for (let i = 0; i < currentComments.length; i++) {
//     commentsArray.push(
//         < CommentBody className="currentCommentBody" body={currentComments[i]}/>
//         // <div className="currentCommentBody">
//         //   {currentComments[i]}
//         //   </div>
//     );
//   }
//   console.log(`commentsArray: ${commentsArray}`);
console.log(`props.body: ${props.body}`);
  return (
    <div className="currentCommentBody">
      {/* <p>{res[i].userId}</p> */}
      <p>{props.body}</p>
      {/* <p>{mockComments[i].numLikes}</p> */}
    </div>
  );
}

export default CommentBody;

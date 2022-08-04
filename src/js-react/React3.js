// React with useState and useEffect hooks

import { useState } from "react";

const allComments = [
  {
    id: 1,
    parentId: null,
    text: "One"
  },
  {
    id: 2,
    parentId: 1,
    text: "Two"
  },
  {
    id: 3,
    parentId: 2,
    text: "Three"
  },
  {
    id: 4,
    parentId: 2,
    text: "Four"
  },
  {
    id: 5,
    parentId: 2,
    text: "Five"
  },
]

// export function CommentWithEdit({ comment }) {
//   // WARNING: DON'T CALL HOOK INSIDE A FOR LOOP
//   // FOLLOWING IS WRONG AND WON'T UPDATE THE TEXT AS EXPECTED
//   const [commentVal, setComment] = useState(comment);

//   function editComment() {
//     setComment(prevVal => prevVal.text = prevVal.text + Math.floor(Math.random() * 10));
//   }

//   return (
//     <h3>{commentVal.text} <button onClick={() => editComment(comment)}>Edit</button></h3>
//   );
// }

export function CommentWithEdit({ text, onEdit }) {
  return <h3> <button onClick={() => onEdit()}>Edit</button> {text} </h3>
}

export default function React3CommentList() {
  const [comments, setComments] = useState(allComments);

  function editComment(commentId) {
    const newCommentText = comments[commentId - 1].text + Math.floor(Math.random() * 10);

    setComments(prev => prev.map(comment =>
      comment.id === commentId ? {
        ...comment,
        text: newCommentText
      } : { ...comment }
    ));
  }

  return (
    <ul>
      {comments && comments.map(comment => {
        return comment.id % 2 === 0 && <CommentWithEdit text={comment.text} key={"comment-" + comment.id} onEdit={() => editComment(comment.id)} />
      })}
    </ul>
  )
}
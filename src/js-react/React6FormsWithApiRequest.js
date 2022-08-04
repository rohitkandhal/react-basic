// In a function component, you should make your AJAX calls in a useEffect hook. 
// When the data or the error returns use setState updater function returned from useState to update the state

// Comment list with useEffect and Loading effect

// React with useState and useEffect hooks

import { useEffect, useState } from "react";

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

function CommentWithEdit({ text, onEdit }) {
  return <h3><button onClick={onEdit}>Edit</button> {text} </h3>
}

export function React6CommentList() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [reload, setReload] = useState(false)

  function editComment(commentId) {
    const newCommentText = comments[commentId - 1].text + Math.floor(Math.random() * 10);

    setComments(prev => prev.map(comment =>
      comment.id === commentId ? {
        ...comment,
        text: newCommentText
      } : { ...comment }
    ));
  }

  useEffect(() => {
    setIsLoading(true);
    setReload(false);

    fetchComments().then(comments => {
      setComments(comments);
      setIsLoading(false)
    })

  }, [reload]);

  return (
    <div className="commentsContainer">
      {isLoading ?
        <div className="loader" >Loading...</div>
        :
        <>
          <ul>
            {
              comments.map(comment => {
                return <CommentWithEdit text={comment.text} key={"comment-" + comment.id} onEdit={() => editComment(comment.id)} />
              })}
          </ul>
          <button onClick={() => setReload(true)} >Reload</button>
        </>
      }
    </div>
  )
}

function fetchComments() {
  const fetchPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(allComments);
    }, 1000)
  });
  return fetchPromise;
}

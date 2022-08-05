// Custom Hooks allow you to easily reuse stateful logic between components.

// After hooks, creating custom hooks is an ideal solution to reuse stateful logic
// Prefer creating a hook for reuseable logic over the render props pattern or high - order components where possible.


// const baseUrl = "http://localhost:3000";
// const url = `${baseUrl}/photos`;

// function translateStatusToErrorMessage(status) {
//   switch (status) {
//     case 401:
//       return "Please login again.";
//     case 403:
//       return "You do not have permission to view the photos.";
//     default:
//       return "There was an error retrieving the photos. Please try again.";
//   }
// }

// function checkStatus(response) {
//   if (response.ok) {
//     return response;
//   } else {
//     const httpErrorInfo = {
//       status: response.status,
//       statusText: response.statusText,
//       url: response.url,
//     };
//     console.log(
//       `logging http details for debugging: ${JSON.stringify(httpErrorInfo)}`
//     );

//     let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
//     throw new Error(errorMessage);
//   }
// }

// function parseJSON(response) {
//   return response.json();
// }

// function delay(ms) {
//   return function (x) {
//     return new Promise((resolve) => setTimeout(() => resolve(x), ms));
//   };
// }

// const photoAPI = {
//   getAll(page = 1, limit = 100) {
//     return (
//       fetch(`${url}?_page=${page}&_limit=${limit}`)
//         // .then(delay(600))
//         .then(checkStatus)
//         .then(parseJSON)
//         .catch((error) => {
//           let errorMessage = translateStatusToErrorMessage(error);
//           throw new Error(errorMessage);
//         })
//     );
//   },
// };

// function PhotoList() {
//   const [loading, setLoading] = React.useState(false);
//   const [photos, setPhotos] = React.useState([]);
//   const [error, setError] = React.useState(null);

//   React.useEffect(() => {
//     setLoading(true);
//     setError(null);

//     photoAPI
//       .getAll(1)
//       .then((data) => {
//         setPhotos(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   if (error) {
//     return <div>{error}</div>;
//   } else if (loading) {
//     return <div>Loading...</div>;
//   } else {
//     return (
//       <ul>
//         {photos.map((photo) => {
//           return (
//             <li key={photo.id}>
//               <img src={photo.thumbnailUrl} alt={photo.title} />
//               <h3>{photo.title}</h3>
//             </li>
//           );
//         })}
//       </ul>
//     );
//   }
// }

// ReactDOM.createRoot(document.getElementById("root")).render(<PhotoList />);


// const baseUrl = "http://localhost:3000";
// const url = `${baseUrl}/photos`;

// function translateStatusToErrorMessage(status) {
//   switch (status) {
//     case 401:
//       return "Please login again.";
//     case 403:
//       return "You do not have permission to view the photos.";
//     default:
//       return "There was an error retrieving the photos. Please try again.";
//   }
// }

// function checkStatus(response) {
//   if (response.ok) {
//     return response;
//   } else {
//     const httpErrorInfo = {
//       status: response.status,
//       statusText: response.statusText,
//       url: response.url,
//     };
//     console.log(
//       `logging http details for debugging: ${JSON.stringify(httpErrorInfo)}`
//     );

//     let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
//     throw new Error(errorMessage);
//   }
// }

// function parseJSON(response) {
//   return response.json();
// }

// function delay(ms) {
//   return function (x) {
//     return new Promise((resolve) => setTimeout(() => resolve(x), ms));
//   };
// }

// const photoAPI = {
//   getAll(page = 1, limit = 100) {
//     return (
//       fetch(`${url}?_page=${page}&_limit=${limit}`)
//         // .then(delay(600))
//         .then(checkStatus)
//         .then(parseJSON)
//         .catch((error) => {
//           let errorMessage = translateStatusToErrorMessage(error);
//           throw new Error(errorMessage);
//         })
//     );
//   },
// };

// function usePhotos() {
//   const [loading, setLoading] = React.useState(false);
//   const [photos, setPhotos] = React.useState([]);
//   const [error, setError] = React.useState(null);

//   React.useEffect(() => {
//     setLoading(true);
//     setError(null);

//     photoAPI
//       .getAll(1)
//       .then((data) => {
//         setPhotos(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   return { loading, photos, error };
// }

// function PhotoList() {
//   const { loading, photos, error } = usePhotos();

//   if (error) {
//     return <div>{error}</div>;
//   } else if (loading) {
//     return <div>Loading...</div>;
//   } else {
//     return (
//       <ul>
//         {photos.map((photo) => {
//           return (
//             <li key={photo.id}>
//               <img src={photo.thumbnailUrl} alt={photo.title} />
//               <h3>{photo.title}</h3>
//             </li>
//           );
//         })}
//       </ul>
//     );
//   }
// }

// ReactDOM.createRoot(document.getElementById("root")).render(<PhotoList />);


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

function useCommentsCustomHook() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setReload(false);
    setIsLoading(true);

    fetchComments().then(comments => {
      setComments(comments);
      setIsLoading(false);
    });
  }, [reload])

  function editComment(commentId) {
    const newCommentText = comments[commentId - 1].text + Math.floor(Math.random() * 10);

    setComments(prev => prev.map(comment =>
      comment.id === commentId ? {
        ...comment,
        text: newCommentText
      } : { ...comment }
    ));
  }

  return [comments, isLoading, setReload, editComment]
}

export function React9CommentList() {
  const [comments, isLoading, setReload, editComment] = useCommentsCustomHook();

  return (
    <div>
      {isLoading ?
        <div className="loader" >Loading First Component...</div>
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

export function React9AnotherCommentList() {
  const [comments, isLoading, setReload, editComment] = useCommentsCustomHook();

  return (
    <div>
      {isLoading ?
        <div className="anotherLoader"> Loading Second Component. </div>
        : <>
          <ul>
            {comments.map(comment => <CommentWithEdit text={comment.text} onEdit={() => editComment(comment.id)} />)}
          </ul>
          <button onClick={() => setReload(true)} >Reload</button>
        </>}
    </div>
  );
}

function fetchComments() {
  const fetchPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(allComments);
    }, 1000)
  });
  return fetchPromise;
}

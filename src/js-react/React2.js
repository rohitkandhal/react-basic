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

export function CommentWithEdit({ text, onEdit }) {
  return (
    <h3>{text} <button onClick={onEdit}>Edit</button></h3>
  );
}

export default function CommentList() {

  // This won't work because in react you can't just set variable value to reflect the updated value
  // That's where state comes in picture
  function editComment(comment) {
    comment.text = comment.text + Math.floor(Math.random() * 10);
  }

  return (
    <ul>
      {allComments.map(comment => {
        return <CommentWithEdit text={comment.text} onEdit={() => editComment(comment)} key={"comment-" + comment.id} />
      })}
    </ul>
  )
}
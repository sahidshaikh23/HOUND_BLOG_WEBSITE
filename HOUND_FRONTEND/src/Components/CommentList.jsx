import React from 'react'
import Comment from './Comment'

function CommentList({comments,currentUser,onEdit,onDelete,blogId}) {
  
  return (
    <div style={{maxHeight:'400px',overflow:"auto"}}>
        {
            comments?.map((el)=>(
                <Comment
                key={el._id}
                comment={el}
                currentUser={currentUser}
                onEdit={onEdit}
                onDelete={onDelete}
                blogId={blogId}
                />
            ))
        }
    </div>
  )
}

export default CommentList
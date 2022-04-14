/* 
  撰写新闻 富文本组件
*/
import React, { useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './index.css'


export default function NewsEditor(props) {
  const [editorState, setEditorState] = useState('')
  useEffect(() => {
    const html = props.content
    if (html === undefined || html.length === 0) return
    const contentBlock = htmlToDraft(html)
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      )
      const editorState = EditorState.createWithContent(contentState)
      setEditorState(editorState)
    }
  }, [props.content])


  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={(editorState) => {
        setEditorState(editorState)
      }}
      onBlur={() => {
        props.getContent(
          draftToHtml(convertToRaw(editorState.getCurrentContent()))
        )
      }}
    />
  )
}

import { Button, Progress, Select, Tooltip } from "antd";
import React, { useState, useEffect, useRef } from "react";

const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  uploading,
  uploadButtonText,
  handleVideo,
  progress,
  handleVideoRemove,
}) => {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  useEffect(() => {
    editorRef.current = {
      // CKEditor: require("@ckeditor/ckeditor5-react"), // depricated in v3
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);
  return editorLoaded ? (
    <div className="">
      <form onSubmit={handleAddLesson}>
        <label htmlFor="">Lesson Name</label>

        <input
          type="text"
          className="form-control square"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          values={values.title}
          placeholder="Lesson Name"
          autoFocus
          required
        />
        <label htmlFor="">Lesson Description</label>
        <CKEditor
          editor={ClassicEditor}
          data={values.content}
          onChange={(event, editor) => {
            setValues({ ...values, content: editor.getData() });
          }}
        ></CKEditor>
        {/* <textarea
          className="form-control mt-3"
          cols="7"
          rows="7"
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          values={values.content}
          placeholder="Lesson Description"
        ></textarea> */}
        <div className="form-row pt-3">
          <div className="col">
            <div className="form-group">
              <label htmlFor="">Course Type</label>

              <Select
                style={{ width: "100%" }}
                size="large"
                value={values.type}
                onChange={(e) => setValues({ ...values, type: e })}
              >
                <Option value={"Content"}>Only Content</Option>
                <Option value={"Video"}>Youtube Video</Option>
                <Option value={"Form"}>Google Form</Option>
              </Select>
            </div>
          </div>
        </div>
        {values.type == "Video" && (
          <>
            <label htmlFor="">YouTube Link</label>
            <input
              type="text"
              className="form-control square"
              onChange={(e) => setValues({ ...values, url: e.target.value })}
              values={values.title}
              placeholder="Paste the Video URL"
              autoFocus
              required
            />
          </>
        )}
        {values.type == "Form" && (
          <>
            <label htmlFor="">Google Forms</label>
            <input
              type="text"
              className="form-control square"
              onChange={(e) => setValues({ ...values, url: e.target.value })}
              values={values.title}
              placeholder="Paste the Form URL"
              autoFocus
              required
            />
          </>
        )}
        {/* <label htmlFor="" className="mt-3">
          Lesson Cover
        </label>
        <div className="d-flex justify-content-center">
          <label className="btn btn-dark btn-block text-left mt-1">
            {uploadButtonText}
            <input onChange={handleVideo} type="file" accept="video/*" hidden />
          </label>

          {!uploading && values.video.Location && (
            <Tooltip title="Remove">
              <span onClick={handleVideoRemove} className="pt-1 pl-3">
                <CloseCircleFilled className="text-danger d-flex justify-content-center pt-4 pointer" />
              </span>
            </Tooltip>
          )}
        </div>

        {progress > 0 && (
          <Progress
            className="d-flex justify-content-center pt-2"
            percent={progress}
            steps={10}
          />
        )} */}

        <Button
          onClick={handleAddLesson}
          className="col mt-3"
          size="large"
          type="primary"
          loading={uploading}
          block
        >
          Add Lesson
        </Button>
      </form>
    </div>
  ) : (
    <div>Editor loading</div>
  );
};

export default AddLessonForm;

import React, { useState } from 'react'
import { Button, Card, FileInput, Label, Textarea, TextInput } from "flowbite-react";
import axios from 'axios';
import { Progress } from "flowbite-react";
import toast, { Toaster } from 'react-hot-toast';




function Videouploder() {

  const [selectfile, setselectfile] = useState(null)
  const [progress, setprogress] = useState(0)
  const [uploading, setuploading] = useState(false)
  const [message, setmessage] = useState("")
  const [videomatadata, setvideomatadata] = useState({
    title: " ",
    description: " "
  })



  function henalfileChange(event) {
    console.log(event.target.files[0])
    setselectfile(event.target.files[0])
  }


  function formfildchange(event) {
    setvideomatadata({
      ...videomatadata,
      [event.target.name]: event.target.value,
    })
  }

  function formsubmit(formEvent) {

    if (!selectfile) {
      alert("selet file...!");
      return;
    }
    formEvent.preventDefault();
    saveVideoToServer(selectfile, videomatadata);

    // submit file to the service 
  }



  function reetformdata() {
    setvideomatadata({
      title: "",
      description : "" 
    })
    setmessage("")
    setprogress(null)
    setuploading(false)
    setselectfile(null)
  }

  async function saveVideoToServer(video, videomatadata) {
    setuploading(true);
    //  api call

    try {

      let formData = new FormData();
      formData.append("title", videomatadata.title)
      formData.append("description", videomatadata.description)
      formData.append("file", selectfile)


      let response = await axios.post(
        `http://localhost:8080/api/v1/videos`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (ProgressEvent) => {
            const progress = Math.round((ProgressEvent.loaded * 100 ) / ProgressEvent.total)
            setprogress(progress);
          }

        });
      setmessage("video uploded...!!")
      toast.success("video uploded successfully...")
      reetformdata();
      setuploading(false)
      
      console.log(response);
      
    } catch (error) {
      setmessage("Error in uploding file ")
      console.log(error)
      toast.error("video uploded error...")
      setuploading(false)
    }
  }



  return (
    <>
      <div className='flex  flex-col  w-1/3   sm:w-full md:w-1/2 mx-auto  content-center '>

        <Card className="mx-9   mt-9">
          <h1 className='text-slate-900 font-serif font-bold text-center text-3xl m-5 '>video Uploder</h1>

          <div >
            <form onSubmit={formsubmit} noValidate>
              <Label
                htmlFor="dropzone-file"
                className="flex h-64/2 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <FileInput id="dropzone-file"  className="hidden" onChange={henalfileChange} />
              </Label>

              {selectfile && 
                < p className='text-green-600 flext  text-start mr-3 text-sm overflow-hidden text-ellipsis whitespace-nowrap truncate w-75 mt-1'> 
                  {selectfile.name}
                </p>

              }
              <div className="mb-2 mt-5 block justify-start">
                <Label htmlFor="disabledInput2" >Video Title</Label>
                <TextInput value={videomatadata.title} type="text" onChange={formfildchange} id="" name="title" placeholder="Enter Title" />
              </div>

              <div className="mb-2 block justify-start">
                <Label htmlFor="comment" value="Video Description" />
              </div>
              <Textarea id="comment" value={videomatadata.description} name="description" onChange={formfildchange} placeholder="enter the description... " required rows={4} />

              {uploading && 
                <Progress
                  progress={progress}
                  progressLabelPosition="inside"
                  textLabel="Flowbite"
                  textLabelPosition="outside"
                  size="lg"
                  labelProgress
                  labelText
                />

              }
              
              <div className='text-center flex justify-center'>
                <Button className='mt-5 text-center flex justify-center bg-green-700 ' type='submit' >
                  Upload
                  <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </>
  )
}

export default Videouploder

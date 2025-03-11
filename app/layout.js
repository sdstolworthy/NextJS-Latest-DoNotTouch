import "../styles/global.css";
import "../styles/layout.css";
import { after } from 'next/server'
import sleep from 'sleep-promise'
import {S3Client, GetObjectCommand} from "@aws-sdk/client-s3"

export default async function App({ children }) {
  let datafetch = async () => {

    try {
      const client = new S3Client({ region: "us-west-2" });
      const response = await client.send(
        new GetObjectCommand({
          Bucket: process.env.BUCKET,
          Key: "helloworld.json",
        }),
      );
      const body = await response.Body.transformToString("utf8");
      return { props: { file: body } };
    } catch (caught) {
      console.error(caught);
      return { props: { file: `there was an error : ${caught}` } };
    }
  }
  let file = await datafetch()
  after(async () => {
    // Execute after the layout is rendered and sent to the user
    console.log("Sleeping after sending response")
    let i= 0;
    while(i<10000000){
      ;
    } // Wait for 3 seconds
    console.log("After call completed")
  })
  return (
    <html>
      <body>
        <p>
          layout render
        </p>
        {JSON.stringify(file)}
        {/* {children} */}
        
      </body>
    </html>
  );
}

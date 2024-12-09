import Image from "next/image";
import {S3Client, GetObjectCommand} from "@aws-sdk/client-s3"

export async function getServerSideProps() {
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
    return { props: { file: "there was an error" } };
  }
}

export default function Home({file}) {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>
        Hello
        <pre>
          {JSON.stringify(file, null, 2)}
        </pre>
        {console.log(`SSR env : `)}
        {console.log(process.env.BUCKET)}
        {console.log(` process env : ${process.env}`)}
      </h1>
    </div>
  );
}

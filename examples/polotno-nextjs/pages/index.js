import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('../components/editor'), {
  ssr: false,
});

export default function IndexPage() {
  return (
    <div>
      <Editor />
      <style jsx global>{`
        body {
          padding: 0;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

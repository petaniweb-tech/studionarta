export default function ProjectDetail({ params }: { params: { slug: string }}) {
  return (
    <div>
      <center>
        <h1 className="title">
          Projects detail page: {params.slug}
        </h1>
      </center>
    </div>
  );
}

interface OperationTitleProps {
  title: string;
}

const OperationTitle = ({
  title
}: OperationTitleProps) => {
  return (
    <h1 className="text-4xl font-bold mb-8">
      { title }
    </h1>
  )
}

export default OperationTitle;
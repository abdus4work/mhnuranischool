

const PageContainer = ({ children,className }) => {
  return (
    <div className={`flex flex-col gap-y-10 items-center md:mt-10 ${className}`}>
        {children}
    </div>
  )
}
export default PageContainer
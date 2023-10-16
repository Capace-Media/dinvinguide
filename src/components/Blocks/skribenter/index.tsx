import AuthorComponent from "./Author";

interface AuthorsComponentProps {
  data: any;
}

const AuthorsComponent = ({ data }: AuthorsComponentProps) => {
  return (
    <>
      {data?.skribenter &&
        data.skribenter.map((author: any, index: number) => {
          return (
            <section key={author.id} className="">
              <AuthorComponent author={author} index={index} />
            </section>
          );
        })}
    </>
  );
};

export default AuthorsComponent;

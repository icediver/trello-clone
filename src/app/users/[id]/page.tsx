import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ID page",
  description: "",
};

type Props = {
  params: {
    id: number;
  };
};

export default function Page({ params }: Props) {
  const { id } = params;
  return <div>ID page {id}</div>;
}

import Image from "next/image";

export const Avatar = ({ image }: { image: string }) => {
  return (
    <Image
      src={image}
      alt="Avatar"
      width={50}
      height={50}
      className="rounded-full"
    />
  );
};

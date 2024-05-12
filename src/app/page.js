import Image from "next/image";
export default function Home() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1>Welcome to</h1>
        <h1 style={{ marginLeft: "10px", color: "#41ac3d" }}>Munggit!</h1>
      </div>
      <h2>
        Here you can expect lots of joyous things! Post about whatever you like
        and join the Mung Community!
      </h2>
      <Image
        src="/mung3.png"
        alt="Mung (Spike from Mario) throwing a spiky ball"
        width={400}
        height={500}
        style={{ position: "fixed", right: 0, bottom: 0 }}
      />
    </div>
  );
}

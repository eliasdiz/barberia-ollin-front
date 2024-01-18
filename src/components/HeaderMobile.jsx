import React from "react";

function HeaderMobile() {
  return (
    <>
      <div className="w-full h-[15rem] border rounded-2xl font-bold bg-opacity-70 bg-black md:hidden">
        <div className="flex justify-end mt-3 px-3 text-black">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAVFJREFUSEvVldFtAjEQRGc6CZUkVBKoJEklOSoJVJJ0stFYu5Yx9mFfxEcsnUAW7BvP7viIBy8+uD6aADN7AvAJQJ97kj9bhdwAiuIvXlTFN0OuAFXxUK1TbIbUANlyUEGSOwd+uVWbIDXAZAvJvF9DBJ7pRw34drW7aGxl25nk/i8A2aHmqqlnFTKz2Eu2zRRPbpR/MLM3AO96SH44IE6VoTOQGiD1UpzVmlk0fiF5nCneOoFGMqYmKfYe6BSaomNYNwpqBS1syg0trLsa1ZHE95IsxVpSvDQCqAE4AZCY1cT37iKFTd5nxQ559SEoHVpNfPc2vWNLgO4mfg0QN6oskEpNURrd1uolfvV90LBlkfetSeolfuiFU9gV4tOJAFz8dNpXz9Jpy8QPATzRskzeawD0vbVurpNhQFRzK6T02UGC6cnXS0meBowmOH73/wG/1Ce+Gdrtg7EAAAAASUVORK5CYII="
            className="w-9 border rounded-lg absolute cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-evenly h-[13rem] text-white">
          <h1 className="text-white text-4xl  xxsm:text-2xl">Barberia Ollin</h1>
          <img
            src="https://i.postimg.cc/ryYmjMph/logo-barberia-png.png"
            alt="logo"
            className=" w-48 xxsm:w-40"
          ></img>
        </div>
      </div>
    </>
  );
}

export default HeaderMobile;

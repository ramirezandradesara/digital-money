import JsPDF from "jspdf";
import html2canvas from "html2canvas";

const convertHtmlToPDF = async (htmlString: string) => {
    let iframe = document.createElement("iframe");
    iframe.style.visibility = "hidden";
    document.body.appendChild(iframe);
    let iframedoc: any = iframe.contentDocument || iframe.contentWindow?.document;
    iframedoc.body.innerHTML = htmlString;

    let canvas = await html2canvas(iframedoc.body, {});

    let imgData = canvas.toDataURL("image/png");

    const doc = new JsPDF({
        format: "a4"
    });

    const timestamp = await new Date().getTime().toString();

    doc.addImage(imgData, "PNG", 0, 0, 0, 0);
    doc.save(`${timestamp}.pdf`);

    document.body.removeChild(iframe);
};

export default convertHtmlToPDF;
/* eslint-disable react/prop-types */
import jsPDF from "jspdf";
import { useRef } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas"; // Import html2canvas library if not already done

function BookingCard({ movie }) {
  const componentRef = useRef();

  const downloadPdf = () => {
    const doc = new jsPDF();
    const element = componentRef.current;

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      doc.save("booking_details.pdf");
    });
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 border shadow p-2 m-3">
      <div ref={componentRef}>
        <p>Movie name : {movie.movieName}</p>
        <p>Date : {movie.date}</p>
        <p>Time : {movie.time}</p>
        <p>Seat Row: {movie.seat_row}</p>
        <p>No of seats: {movie.seat_number}</p>
        <p>Price : {movie.price}</p>
        <p>Booking id : {movie.id}</p>
        <QRCode value={JSON.stringify(movie)} size={100} />
      </div>
      <button className="btn btn-outline-info" onClick={downloadPdf}>
        Download Ticket
      </button>
    </div>
  );
}

export default BookingCard;

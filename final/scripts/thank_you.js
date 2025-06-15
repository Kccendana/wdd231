// THANK YOU
const currentUrl = window.location.href;
const everything = currentUrl.split('?');

if (everything.length > 1) {
  const formData = new URLSearchParams(everything[1]);

  function show(info) {
    let value = formData.get(info);
    if (!value) return null;

    if (info === 'timestamp') {
      try {
        const [date, time] = value.split('T');
        return { date, time };
      } catch (error) {
        console.error("Error parsing timestamp:", error);
        return { date: null, time: null };
      }
    }

    return decodeURIComponent(value).replace('%40', '@');
  }

  const showInfo = document.querySelector("#thanks");
  const timestampData = show("timestamp");

  const formattedTime = timestampData
    ? new Date(`${timestampData.date}T${timestampData.time}`).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    : "Time not available";

  const htmlContent = `
    <h1>Thank You!</h1>
    <p class="greeting">
      We will contact you as soon as possible regarding your inquiries.
    </p>
    <div class="sub-details">
      <h2>Inquiry Details</h2>
      <p><strong>First Name: </strong>${show("user-firstname")?.replace("+", " ") || "N/A"}</p>
      <p><strong>Last Name: </strong>${show("user-lastname") || "N/A"}</p>
      <p><strong>Number: </strong>${show("contact_number") || "N/A"}</p>
      <p><strong>Message: </strong>${show("message")?.replace("+", " ") || "N/A"}</p>
      <p><strong>Inquiry Date: </strong>${timestampData?.date || "N/A"} at ${formattedTime}</p>
    </div>
  `;

  showInfo.innerHTML = htmlContent;
}
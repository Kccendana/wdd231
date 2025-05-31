// THANK YOU
const currentUrl = window.location.href;
const everything = currentUrl.split('?');

if (everything.length > 1) {
  const formData = new URLSearchParams(everything[1]);
  console.log([...formData.entries()]);

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
      We're thrilled about your interest in becoming part of our organization. Your application has been submitted successfully!
    </p>
    <div class="sub-details">
      <h2>Submission Details</h2>
      <p><strong>First Name: </strong>${show("firstname")?.replace("+", " ") || "N/A"}</p>
      <p><strong>Last Name: </strong>${show("lastname") || "N/A"}</p>
      <p><strong>Email: </strong>${show("email") || "N/A"}</p>
      <p><strong>Number: </strong>${show("phone") || "N/A"}</p>
      <p><strong>Business: </strong>${show("orgtitle")?.replace("+", " ") || "N/A"}</p>
      <p><strong>Submission Date: </strong>${timestampData?.date || "N/A"} at ${formattedTime}</p>
    </div>
  `;

  showInfo.innerHTML = htmlContent;
}
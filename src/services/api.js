const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 


/* =========================================================
   API REQUEST HELPER
========================================================= */

async function request(path, options = {}) {
  const cleanPath = path.startsWith("/")
    ? path
    : `/${path}`;

  const url = `${API_BASE_URL}${cleanPath}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        `API request failed: ${response.status}`
    );
  }

  return data;
}

/* =========================================================
   API
========================================================= */

export const api = {
  /* =======================================================
     HOSPITALS
     
     Azure Function:
     /api/getHospitals
     
     Response:
     {
       success: true,
       count: 2,
       hospitals: [...]
     }
  ======================================================= */

  getHospitals: () =>
    request("/getHospitals"),

  /* =======================================================
     DOCTORS
     
     Azure Function:
     /api/getDoctors
  ======================================================= */

  getDoctors: () =>
    request("/getDoctors"),

  /* =======================================================
     REGISTER DOCTOR
     
     Azure Function:
     /api/doctorRegister
  ======================================================= */

  registerDoctor: (payload) =>
    request("/doctorRegister", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  /* =======================================================
     PATIENTS
     
     Azure Function:
     /api/getPatients
  ======================================================= */

  getPatients: () =>
    request("/getPatients"),

  /* =======================================================
     REGISTER PATIENT
     
     Azure Function:
     /api/patientRegister
  ======================================================= */

  registerPatient: (payload) =>
    request("/patientRegister", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  /* =======================================================
     APPOINTMENTS
     
     Azure Function:
     /api/appointments
  ======================================================= */

  bookAppointment: (payload) =>
    request("/appointments", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  /* =======================================================
     DOCTOR APPOINTMENTS
     
     Azure Function:
     /api/doctors/{doctorId}/appointments
  ======================================================= */

  getDoctorAppointments: (doctorId) =>
    request(
      `/doctors/${encodeURIComponent(
        doctorId
      )}/appointments`
    ),
};
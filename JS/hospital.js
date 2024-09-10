// Sample Bed Availability Data
const bedAvailability = {
    ICU: 5,
    General: 10,
    Private: 2,
    Maternity: 8,
};

const doctorsInfo = {
    cardiology: [
        { name: 'Dr. Amit Sharma', availability: '9 AM - 5 PM' },
        { name: 'Dr. Neha Gupta', availability: '10 AM - 6 PM' }
    ],
    neurology: [
        { name: 'Dr. Rohit Verma', availability: '9 AM - 3 PM' },
        { name: 'Dr. Sanjay Kapoor', availability: '12 PM - 8 PM' }
    ],
    orthopedics: [
        { name: 'Dr. Meena Desai', availability: '8 AM - 2 PM' },
        { name: 'Dr. Suresh Rao', availability: '10 AM - 5 PM' }
    ],
    pediatrics: [
        { name: 'Dr. Priya Menon', availability: '9 AM - 1 PM' },
        { name: 'Dr. Kiran Patil', availability: '11 AM - 6 PM' }
    ]
};

// Function to Display Bed Availability
function loadBedAvailability() {
    let bedInfo = document.getElementById('bed-info');
    let bedText = `ICU Beds: ${bedAvailability.ICU}, 
        General Beds: ${bedAvailability.General}, 
        Private Beds: ${bedAvailability.Private}, 
        Maternity Beds: ${bedAvailability.Maternity}`;
    bedInfo.innerText = bedText;
}

// Function to Display Selected Doctor Information
function showDoctorInfo() {
    let select = document.getElementById('doctor-select');
    let doctorInfo = document.getElementById('doctor-info');
    let department = select.value;

    if (department) {
        let doctors = doctorsInfo[department];
        let output = '<ul>';
        doctors.forEach(doctor => {
            output += `<li>${doctor.name} - Available: ${doctor.availability}</li>`;
        });
        output += '</ul>';
        doctorInfo.innerHTML = output;
    } else {
        doctorInfo.innerHTML = '';
    }
}

// Call the function to load initial data
window.onload = loadBedAvailability;

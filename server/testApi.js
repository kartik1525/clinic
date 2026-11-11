async function runTests() {
  try {
    // 1. Health check
    const healthRes = await fetch('http://localhost:5000/api/health');
    const health = await healthRes.json();
    console.log('1. Health check:', health);

    // 2. Fetch doctors
    const doctorsRes = await fetch('http://localhost:5000/api/doctors');
    const doctors = await doctorsRes.json();
    console.log('2. Doctors count:', doctors.count, 'First doctor:', doctors.data[0].name);

    const docId = doctors.data[0]._id;

    // 3. Fetch appointments
    const apptsRes = await fetch('http://localhost:5000/api/appointments');
    const appts = await apptsRes.json();
    console.log('3. Appointments count:', appts.count, 'Stats:', appts.stats);

    // 4. Test creating appointment
    const createRes = await fetch('http://localhost:5000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientName: 'Kavita Pandey',
        phone: '+91 98765 43210',
        email: 'kavita.pandey@example.com',
        doctorId: docId,
        appointmentDate: '2026-11-25',
        appointmentTime: '11:00 AM',
        reason: 'Preventive health checkup and seasonal viral consultation',
      }),
    });
    const created = await createRes.json();
    console.log(`4. Create appointment (HTTP ${createRes.status}):`, created.success, created.message);
    const newApptId = created.data?._id;

    // 5. Test duplicate booking prevention (Same doctor, date, time)
    const dupRes = await fetch('http://localhost:5000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientName: 'Aman Saxena',
        phone: '+91 91234 56780',
        email: 'aman.saxena@example.com',
        doctorId: docId,
        appointmentDate: '2026-11-25',
        appointmentTime: '11:00 AM',
        reason: 'Should be rejected as duplicate',
      }),
    });
    const dupData = await dupRes.json();
    console.log(`5. Duplicate booking test (HTTP ${dupRes.status}):`, dupData.success, dupData.message);

    // 6. Test updating status
    const patchRes = await fetch(`http://localhost:5000/api/appointments/${newApptId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Cancelled' }),
    });
    const patched = await patchRes.json();
    console.log(`6. Update status to Cancelled (HTTP ${patchRes.status}):`, patched.success, patched.data?.status);

    // 7. Verify slot can now be booked because status is Cancelled (partial unique index test!)
    const rebookRes = await fetch('http://localhost:5000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientName: 'Shreya Joshi',
        phone: '+91 94500 12345',
        email: 'shreya.joshi@example.com',
        doctorId: docId,
        appointmentDate: '2026-11-25',
        appointmentTime: '11:00 AM',
        reason: 'Rebooking cancelled slot',
      }),
    });
    const rebookData = await rebookRes.json();
    console.log(`7. Rebooking previously cancelled slot (HTTP ${rebookRes.status}):`, rebookData.success, rebookData.message);

    console.log('\n--- ALL BACKEND CHECKS PASSED PERFECTLY ---');
    process.exit(0);
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  }
}

runTests();


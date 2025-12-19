'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Upload, Calendar, ArrowRight, ArrowLeft, Camera, Sun, User, Download } from 'lucide-react';

export default function AstroPage() {
  // --- CONFIGURATION ---
  const FORM_TOKEN = "b637a97079868fee3296446469d14e69"; 
  // ---------------------

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState({ title: "", price: "" });
  const [name, setName] = useState("");
  
  // Refs to check if inputs are filled
  const palmInputRef = useRef(null);
  const formRef = useRef(null);

  const prevStep = () => setStep(prev => prev - 1);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setStep(2);
  };

  // VALIDATION LOGIC: Prevents moving to Step 3 without photo
  const handleProceedToPayment = () => {
    // 1. Check Name
    if (!name || name.length < 2) {
      alert("Please enter your full name.");
      return;
    }

    // 2. Check other required fields using native form validity
    // We scan the form to see if the required fields in Step 2 are empty
    // NOTE: We only strictly require DOB and Email now.
    const dob = document.querySelector('input[name="DOB"]').value;
    const email = document.querySelector('input[name="email"]').value;

    if (!dob || !email) {
      alert("Please fill in your Name, Date of Birth, and Email.");
      return;
    }

    // 3. CRITICAL: Check if Palm Photo is selected
    if (palmInputRef.current) {
        if (palmInputRef.current.files.length === 0) {
            alert("⚠️ Please upload your Palm Photo before proceeding.");
            return;
        }
    }

    // If all good, move to Step 3
    setStep(3);
  };

  // Helper to generate a compliment
  const getNameCompliment = (n) => {
    if (!n || n.length < 3) return null;
    return `${n}... a name with a powerful vibration.`;
  };

  return (
    <div className="main-wrapper" style={{ minHeight: '100vh', position: 'relative', paddingBottom: '60px' }}>
      <div className="stars"></div>
      
      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ textAlign: 'center', padding: '60px 20px 20px' }}
      >
        <h1 style={{ fontSize: '3.5rem', margin: 0 }}>ASTRO VISION</h1>
        <p style={{ fontSize: '1.4rem', color: '#aaa', fontStyle: 'italic' }}>
          "The stars incline, they do not compel."
        </p>
      </motion.div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        
        {/* PROGRESS BAR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative', maxWidth: '600px', margin: '0 auto 40px auto' }}>
          {[1, 2, 3].map((num) => (
            <div key={num} style={{ 
              width: '40px', height: '40px', 
              borderRadius: '50%', 
              background: step >= num ? '#ffd700' : 'rgba(255,255,255,0.1)',
              color: step >= num ? '#000' : '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 'bold', zIndex: 2, border: '2px solid #ffd700'
            }}>
              {num}
            </div>
          ))}
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', background: 'rgba(255,215,0,0.3)', zIndex: 1 }}></div>
        </div>

        {/* MASTER FORM */}
        <form 
          ref={formRef}
          action={`https://formsubmit.co/${FORM_TOKEN}`} 
          method="POST" 
          encType="multipart/form-data"
        >
          {/* HIDDEN CONFIG INPUTS */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_subject" value={`New Astrology Order: ${name}`} />
          
          <input type="hidden" name="Selected_Service" value={selectedService.title} />
          <input type="hidden" name="Service_Price" value={selectedService.price} />


          {/* --- STEP 1: SERVICE SELECTION --- */}
          <div style={{ display: step === 1 ? 'grid' : 'none', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
             {/* Service 1 */}
             <div className="glass-panel" onClick={() => handleServiceSelect({title: "Palmistry Reading", price: "₹11"})} style={{ padding: '30px', cursor: 'pointer', textAlign: 'center', minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Upload size={32} color="#ffd700" style={{ margin: '0 auto 15px' }} />
                <h3>Palmistry Reading</h3>
                <h5 style={{ marginTop: '1px' }}>WHAT YOU WILL GET:</h5>
                <p>Life Line Analysis</p>
                <p>Career Insights</p>
                <p>Heart Line Reading</p>
                <h2 style={{ color: '#ffd700' }}>₹11</h2>
             </div>
             {/* Service 2 */}
             <div className="glass-panel" onClick={() => handleServiceSelect({title: "2026 Prophecy", price: "₹11"})} style={{ padding: '30px', cursor: 'pointer', textAlign: 'center', minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Calendar size={32} color="#ffd700" style={{ margin: '0 auto 15px' }} />
                <h3>2026 Prophecy</h3>
                <h5 style={{ marginTop: '1px' }}>WHAT YOU WILL GET:</h5>
                <p>Comprehensive astrological predictions for your entire year 2026.</p>
                <p>Career & Finance, Love & Relationships</p>
                <h2 style={{ color: '#ffd700' }}>₹11</h2>
             </div>
             {/* Service 3 */}
             <div className="glass-panel" onClick={() => handleServiceSelect({title: "Grand Destiny Combo", price: "₹51"})} style={{ padding: '30px', cursor: 'pointer', textAlign: 'center', minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Sparkles size={32} color="#ffd700" style={{ margin: '0 auto 15px' }} />
                <h3>Grand Destiny Combo</h3>
                <h5 style={{ marginTop: '1px' }}>WHAT YOU WILL GET:</h5>
                <p>Complete Palmistry + 2026 Forecast + Love Insight.</p>
                <p>With special personalized guidance and bonus.</p>
                <h2 style={{ color: '#ffd700' }}>₹51</h2>
             </div>
          </div>


          {/* --- STEP 2: USER DETAILS --- */}
          <div className="glass-panel" style={{ display: step === 2 ? 'block' : 'none', padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
              <button type="button" onClick={prevStep} style={{ background: 'transparent', border: 'none', color: '#ffd700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px' }}>
                <ArrowLeft size={16}/> Back
              </button>
              
              <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Your Celestial Profile</h2>

              <div style={{ marginBottom: '20px' }}>
                <label>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    name="Name" 
                    required 
                    placeholder="Enter your name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ paddingLeft: '40px' }}
                  />
                  <User size={20} style={{ position: 'absolute', left: '10px', top: '15px', color: '#aaa' }}/>
                </div>
                
                {/* MAGICAL COMPLIMENT */}
                <AnimatePresence>
                  {name.length > 2 && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0 }}
                      style={{ color: '#ffd700', fontSize: '0.9rem', marginTop: '5px', fontStyle: 'italic' }}
                    >
                      ✨ {getNameCompliment(name)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div><label>Date of Birth</label><input type="date" name="DOB" required /></div>
                
                {/* OPTIONAL TIME */}
                <div>
                  <label>Time of Birth <small style={{color:'#aaa', fontWeight:'normal'}}>(Optional)</small></label>
                  <input type="time" name="Time_of_Birth" />
                </div>
              </div>
              
              <div style={{ marginTop: '20px' }}>
                <label>Email Address</label>
                <input type="email" name="email" required placeholder="You will receive updates here" />
              </div>
              
              {/* OPTIONAL PHONE */}
              <div style={{ marginTop: '20px' }}>
                <label>Mobile Number <small style={{color:'#aaa', fontWeight:'normal'}}>(Optional)</small></label>
                <input type="tel" name="Phone" placeholder="Optional" />
              </div>

              <div style={{ marginTop: '30px', border: '1px dashed #ffd700', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                <Camera size={40} color="#ffd700" style={{ marginBottom: '10px' }}/>
                <label style={{ display: 'block' }}>Upload Palm Photo</label>
                
                {/* Ref attached here to check file presence */}
                <input 
                  type="file" 
                  name="Palm_Photo" 
                  accept="image/png, image/jpeg" 
                  required 
                  ref={palmInputRef}
                  style={{ marginTop: '10px' }} 
                />
                
                <p style={{ fontSize: '0.9rem', color: '#aaa', marginTop: '5px' }}>Required for reading</p>
              </div>

              <button type="button" className="mystic-btn" onClick={handleProceedToPayment}>
                Proceed to Offering <ArrowRight size={18} style={{ display: 'inline', marginLeft: '10px' }}/>
              </button>
          </div>


          {/* --- STEP 3: PAYMENT & SUBMIT --- */}
          <div className="glass-panel" style={{ display: step === 3 ? 'block' : 'none', padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
              <button type="button" onClick={prevStep} style={{ background: 'transparent', border: 'none', color: '#ffd700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px' }}>
                <ArrowLeft size={16}/> Edit Details
              </button>

              <h2>Sacred Exchange</h2>
              <p style={{ fontSize: '1.2rem' }}>
                Offering amount: <span style={{ color: '#ffd700', fontWeight: 'bold' }}>{selectedService.price}</span>
              </p>

              <div style={{ background: '#fff', padding: '20px', borderRadius: '15px', display: 'inline-block', marginBottom: '15px' }}>
                <img src="qr.jpeg" alt="Payment QR" width={250} height={250} style={{ display: 'block' }} /> 
              </div>

              {/* DOWNLOAD QR BUTTON */}
              <div style={{ marginBottom: '30px' }}>
                <a 
                  href="/qr.jpeg" 
                  download="Astro_Payment_QR" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    color: '#ffd700', 
                    textDecoration: 'none', 
                    border: '1px solid #ffd700',
                    padding: '8px 15px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    transition: '0.3s'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,215,0,0.1)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <Download size={16} /> Download QR Code
                </a>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#aaa', marginTop: '5px' }}>After payment CONFIRMATION, You will receive updates on your email within 10 min.</p>

              <div style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
                <label>Upload Payment Screenshot</label>
                <input type="file" name="Payment_Screenshot" accept="image/png, image/jpeg" required />
              </div>

              <button type="submit" className="mystic-btn">
                Seal Your Fate (Submit)
              </button>
          </div>

        </form>
      </div>

      {/* FOOTER */}
      <footer style={{ 
        textAlign: 'center', 
        padding: '20px', 
        fontSize: '0.9rem', 
        color: '#888',
        position: 'absolute',
        bottom: 0,
        width: '100%'
      }}>
        Made by <span style={{ color: '#ffd700', textShadow: '0 0 5px rgba(255, 215, 0, 0.5)' }}>Aditya</span>
      </footer>

    </div>
  );
}
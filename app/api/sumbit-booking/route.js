import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to parse form data
async function parseForm(request) {
  const formData = await request.formData();
  
  const data = {
    name: formData.get('name'),
    dateOfBirth: formData.get('dateOfBirth'),
    timeOfBirth: formData.get('timeOfBirth'),
    email: formData.get('email'),
    mobile: formData.get('mobile'),
    serviceName: formData.get('serviceName'),
    servicePrice: formData.get('servicePrice'),
    palmImage: formData.get('palmImage'),
    paymentScreenshot: formData.get('paymentScreenshot'),
  };
  
  return data;
}

// Helper function to save file
async function saveFile(file, folderPath, fileName) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const filePath = path.join(folderPath, fileName);
  await writeFile(filePath, buffer);
  
  return filePath;
}

export async function POST(request) {
  try {
    // Parse the form data
    const data = await parseForm(request);
    
    // Create a safe folder name from user name (remove special characters)
    const safeFolderName = data.name
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase();
    
    // Add timestamp to make folder unique
    const timestamp = new Date().getTime();
    const folderName = `${safeFolderName}_${timestamp}`;
    
    // Create the uploads directory path
    const uploadsDir = path.join(process.cwd(), 'uploads', folderName);
    
    // Create the folder
    await mkdir(uploadsDir, { recursive: true });
    
    // Save palm image
    const palmImageExt = data.palmImage.name.split('.').pop();
    await saveFile(data.palmImage, uploadsDir, `palm_photo.${palmImageExt}`);
    
    // Save payment screenshot
    const paymentExt = data.paymentScreenshot.name.split('.').pop();
    await saveFile(data.paymentScreenshot, uploadsDir, `payment_screenshot.${paymentExt}`);
    
    // Create user info text file
    const userInfo = `
========================================
MYSTIC PALM READING - USER BOOKING
========================================

Name: ${data.name}
Date of Birth: ${data.dateOfBirth}
Time of Birth: ${data.timeOfBirth}
Email: ${data.email}
Mobile: ${data.mobile || 'Not provided'}

Service Details:
----------------
Service: ${data.serviceName}
Price: ${data.servicePrice}

Booking Date: ${new Date().toLocaleString()}

Files Saved:
- palm_photo.${palmImageExt}
- payment_screenshot.${paymentExt}

========================================
`;
    
    const textFilePath = path.join(uploadsDir, 'user_info.txt');
    await writeFile(textFilePath, userInfo);
    
    console.log(`✅ Booking saved successfully in: uploads/${folderName}`);
    
    return NextResponse.json({
      success: true,
      message: 'Booking submitted successfully!',
      folder: folderName
    });
    
  } catch (error) {
    console.error('Error saving booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save booking data' },
      { status: 500 }
    );
  }
}
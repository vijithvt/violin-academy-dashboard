
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

/**
 * Upload a student's photo to Supabase storage
 * @param file File to upload
 * @returns URL of the uploaded file
 */
export const uploadStudentPhoto = async (file: File): Promise<string | null> => {
  try {
    // Generate a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `student_photos/${fileName}`;

    // Upload file to Supabase
    const { data, error } = await supabase.storage
      .from('student_photos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading file:', error);
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('student_photos')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error in uploadStudentPhoto:', error);
    return null;
  }
};

/**
 * Delete a student's photo from Supabase storage
 * @param url URL of the file to delete
 * @returns boolean indicating success
 */
export const deleteStudentPhoto = async (url: string): Promise<boolean> => {
  try {
    // Extract the file path from the URL
    const urlParts = url.split('/');
    const filePath = urlParts.slice(urlParts.indexOf('student_photos')).join('/');
    
    // Delete the file
    const { error } = await supabase.storage
      .from('student_photos')
      .remove([filePath]);
    
    if (error) {
      console.error('Error deleting file:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteStudentPhoto:', error);
    return false;
  }
};


import { supabase } from "@/integrations/supabase/client";

// Create a storage bucket for student photos if it doesn't exist
export async function createStorageBucketIfNeeded() {
  try {
    // Check if the bucket exists
    const { data: existingBuckets } = await supabase.storage.listBuckets();
    const bucketExists = existingBuckets?.some(bucket => bucket.name === 'student-photos');
    
    if (!bucketExists) {
      // Create the bucket if it doesn't exist
      await supabase.storage.createBucket('student-photos', {
        public: true,
        fileSizeLimit: 1024 * 1024, // 1MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      });
      
      console.log("Created student-photos bucket");
    }
  } catch (error) {
    console.error("Error checking/creating storage bucket:", error);
  }
}

// Upload a student photo
export async function uploadStudentPhoto(file: File, studentId: string) {
  try {
    // Ensure the bucket exists
    await createStorageBucketIfNeeded();
    
    // Create a unique filename
    const fileName = `${studentId}/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    
    // Upload the file
    const { data, error } = await supabase.storage
      .from('student-photos')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });
      
    if (error) throw error;
    
    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from('student-photos')
      .getPublicUrl(fileName);
      
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Error uploading photo:", error);
    throw error;
  }
}

// Delete a student photo
export async function deleteStudentPhoto(url: string) {
  try {
    // Extract the path from the URL
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const filePath = pathParts.slice(pathParts.indexOf('student-photos') + 1).join('/');
    
    if (!filePath) throw new Error("Invalid photo URL");
    
    const { error } = await supabase.storage
      .from('student-photos')
      .remove([filePath]);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error deleting photo:", error);
    throw error;
  }
}

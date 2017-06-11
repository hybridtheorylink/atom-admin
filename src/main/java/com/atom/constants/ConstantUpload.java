package com.atom.constants;

public class ConstantUpload {

	public static final Integer MAX_UPLOAD_SIZE =1024 * 1024 * 100 ;//最大上传100M文件
	
    /**上传格式**/
    public static final String[] UPLOAD_IMAGE_EXTENSION = new String[] {"jpg","jpeg","bmp","gif","png"};
    
    
    public static final String[] UPLOAD_MEDIA_EXTENSION = new String[] {"swf","flv","mp3","wav","avi","rm","rmvb","swf","flv"};
    
    public static final String[] UPLOAD_FILE_EXTENSION = new String[] {"zip","rar","7z","doc","docx","ppt","pptx"};
    
    public static final String[] UPLOAD_EXCEL_EXTENSION = new String[] {"xls","xlsx"};
    
    public static final Integer UPLOADMAXSIZE = 10;
    
    /**保存路径**/
    public static final String IMAGEUPLOADPATH = "/MonitorUpload/image/";
    
    public static final String EXCELUPLOADPATH = "/MonitorUpload/excel/";
    
    public static final String FILEUPLOADPATH = "/MonitorUpload/file/";
    
    public static final String MEDIAUPLOADPATH = "/MonitorUpload/media/";
    
    public static final String BASE_IP = "";//上传地址
	
	

}

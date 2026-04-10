<?php
/* ===============================================
   WalkMe - Database Connection File
   חיבור למסד נתונים
   =============================================== */

// הגדרות חיבור - עדכנו את הפרטים בהתאם לפרטי ה-cPanel שלכם
define('DB_HOST', '127.0.0.1');           // כתובת השרת (לרוב localhost או 127.0.0.1)
define('DB_USER', 'romiel2');     // שם משתמש של מסד הנתונים
define('DB_PASS', 'nUajXftZUn');   // סיסמת מסד הנתונים
define('DB_NAME', 'romiel2_walk_me_1');   // שם מסד הנתונים

// יצירת חיבור למסד נתונים
function getDBConnection() {
    try {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

        // בדיקת חיבור
        if ($conn->connect_error) {
            throw new Exception("Connection failed: " . $conn->connect_error);
        }

        // תמיכה בעברית
        $conn->set_charset("utf8mb4");

        return $conn;

    } catch (Exception $e) {
        // רישום שגיאה (בפרודקשן - לא להציג פרטי שגיאה למשתמש)
        error_log("Database connection error: " . $e->getMessage());
        return null;
    }
}

// פונקציה לסגירת חיבור
function closeDBConnection($conn) {
    if ($conn) {
        $conn->close();
    }
}
?>

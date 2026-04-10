<?php
/* ===============================================
   WalkMe - Save Volunteer Registration
   חיבור למסד נתונים + שמירת הרשמה
   =============================================== */

// הגדרות חיבור - עדכנו את הפרטים בהתאם לפרטי ה-cPanel שלכם
define('DB_HOST', '127.0.0.1');           // כתובת השרת (לרוב localhost או 127.0.0.1)
define('DB_USER', 'romiel2');     // שם משתמש של מסד הנתונים
define('DB_PASS', 'nUajXftZUn');   // סיסמת מסד הנתונים
define('DB_NAME', 'romiel2_walk_me_1');   // שם מסד הנתונים

// יצירת חיבור למסד נתונים
try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // תמיכה בעברית
    $conn->set_charset("utf8mb4");

} catch (Exception $e) {
    error_log("Database connection error: " . $e->getMessage());
    echo json_encode(['success' => false, 'errors' => ['שגיאה בחיבור למסד הנתונים']]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get form data and sanitize
    $full_name = htmlspecialchars(trim($_POST['full_name'] ?? ''));
    $id_number = htmlspecialchars(trim($_POST['id_number'] ?? ''));
    $email = htmlspecialchars(trim($_POST['email'] ?? ''));
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $preferred_date = htmlspecialchars(trim($_POST['preferred_date'] ?? ''));
    $preferred_time = htmlspecialchars(trim($_POST['preferred_time'] ?? ''));
    $dog_id = htmlspecialchars(trim($_POST['dog_id'] ?? ''));
    $experience = htmlspecialchars(trim($_POST['experience'] ?? ''));
    $comments = htmlspecialchars(trim($_POST['comments'] ?? ''));

    // Server-side validation
    $errors = [];

    // Validate full name (at least 2 words)
    if (empty($full_name) || count(explode(' ', trim($full_name))) < 2) {
        $errors[] = "שם מלא חייב להכיל לפחות 2 מילים";
    }

    // Validate ID number (9 digits)
    if (!preg_match('/^\d{9}$/', $id_number)) {
        $errors[] = "תעודת זהות חייבת להכיל 9 ספרות";
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "כתובת אימייל לא תקינה";
    }

    // Validate phone (Israeli format)
    $phone_clean = preg_replace('/[^0-9]/', '', $phone);
    if (!preg_match('/^05\d{8}$/', $phone_clean)) {
        $errors[] = "מספר טלפון לא תקין";
    }

    // Validate date (must be future)
    if (empty($preferred_date) || strtotime($preferred_date) <= strtotime('today')) {
        $errors[] = "יש לבחור תאריך עתידי";
    }

    // Validate time
    if (empty($preferred_time)) {
        $errors[] = "יש לבחור שעה";
    }

    // Validate dog selection
    if (empty($dog_id)) {
        $errors[] = "יש לבחור כלב";
    }

    // If there are errors, return them
    if (!empty($errors)) {
        echo json_encode(['success' => false, 'errors' => $errors]);
        $conn->close();
        exit;
    }

    // Prepare SQL statement (using prepared statements for security)
    $sql = "INSERT INTO registrations (full_name, id_number, email, phone, preferred_date, preferred_time, dog_id, experience, comments)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        echo json_encode(['success' => false, 'errors' => ['שגיאה בהכנת השאילתה: ' . $conn->error]]);
        $conn->close();
        exit;
    }

    // Bind parameters
    $stmt->bind_param("sssssssss",
        $full_name,
        $id_number,
        $email,
        $phone,
        $preferred_date,
        $preferred_time,
        $dog_id,
        $experience,
        $comments
    );

    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'ההרשמה נשמרה בהצלחה!'
        ]);
    } else {
        // בדיקה אם מדובר בשגיאת כפילות (duplicate entry) - קוד שגיאה 1062
        if ($stmt->errno == 1062) {
            echo json_encode(['success' => false, 'errors' => ['כבר קיימת הרשמה עם אותו כלב באותו תאריך. ניתן לבחור כלב אחר או תאריך אחר.']]);
        } else {
            echo json_encode(['success' => false, 'errors' => ['שגיאה בשמירת הנתונים: ' . $stmt->error]]);
        }
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();

} else {
    // Not a POST request
    echo json_encode(['success' => false, 'errors' => ['Invalid request method']]);
    $conn->close();
}
?>

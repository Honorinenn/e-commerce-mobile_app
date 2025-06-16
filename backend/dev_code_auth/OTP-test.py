cdimport smtplib
from email.message import EmailMessage
import random
import time

#/////////////////////////////////////////////////////////////////////////////////////////////////////////////
# 1) How it works:
#
# Generate OTP:
#    A random 6-digit OTP is generated using random.randint.
#
# Send OTP:
#   The OTP is sent to the user's email address using SMTP.
#   Replace your-email@gmail.com and your-password with valid credentials.
# 
# User Input:
#   The user enters the OTP they received.
# 
# Verify OTP:
#   The OTP is compared to the one sent and checked for expiration (5-minute validity).
#///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
# 2) Instruction: 
# 
#   a. Enable App Passwords in Gmail
#       Gmail doesn't allow direct password usage for third-party apps. You need to generate an "App Password."
#       Follow these steps:
#           - Go to Google Account Security.
#           - Enable 2-Step Verification if it's not already enabled.
#           - After enabling, find the App Passwords section.
#           - Generate an App Password for your application (e.g., select "Mail" and "Windows Computer").
#           - Replace the sender_password in your script with the generated App Password.
#
#   b. Verify Credentials
#           - Ensure the email and password in the script are correct.
#           - The email in sender_email must match the account generating the App Password.
#
#   c. Adjust Gmail Security Settings
#           - Visit Less Secure App Access and ensure this setting is enabled (if App Passwords are not used).
#/////////////////////////////////////////////////////////////////////////////////////////////////////////////

# Function to generate a random OTP
def generate_otp():
    return str(random.randint(100000, 999999))

# Function to send the OTP via email
def send_otp_email(sender_email, sender_password, recipient_email, otp):
    try:
        # Create email content
        email = EmailMessage()
        email['From'] = sender_email
        email['To'] = recipient_email
        email['Subject'] = "Your OTP Code"
        email.set_content(f"Dear User,\n\nYour OTP code for login is: {otp}\n\nThis code is valid for 5 minutes.\n\nBest regards,\nYour Security Team")

        # Send the email
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:  # Update SMTP server and port if necessary
            smtp.login(sender_email, sender_password)
            smtp.send_message(email)
            print(f"OTP has been sent to {recipient_email}")

    except Exception as e:
        print(f"Failed to send email: {e}")

# Function to verify the OTP
def verify_otp(user_otp, generated_otp, start_time):
    # Check if the OTP matches and is within the time limit
    if user_otp == generated_otp and (time.time() - start_time) <= 300:  # 5 minutes = 300 seconds
        return True
    return False

# Main script
if __name__ == "__main__":
    # Configuration
    sender_email = "jamesle021198@gmail.com"
    sender_password = "bxsx lfyr kihn dpqs"  # Use an app password if necessary
    recipient_email = input("Enter your email address: ")

    # Generate and send OTP
    otp = generate_otp()
    send_otp_email(sender_email, sender_password, recipient_email, otp)
    otp_start_time = time.time()

    # Prompt user for OTP input
    user_otp = input("Enter the OTP sent to your email: ")

    # Verify OTP
    if verify_otp(user_otp, otp, otp_start_time):
        print("Login successful!")
    else:
        print("Invalid OTP or OTP expired. Please try again.")

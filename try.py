from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Initialize the driver
driver = webdriver.Chrome()

# Open the page
driver.get("https://master-7rqtwti-c5v7sxvquxwl4.eu-4.magentosite.cloud/checkout")

# Delay the execution for 10 seconds
time.sleep(3)

# Click the button
driver.find_element(By.XPATH, "//button[contains(@class,'accountTrigger-trigger-23q clickable-root-1HB')]").click()

# Wait for the element to be visible
WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, "//span[contains(@class,'signIn-title-2hm capitalize')]")))

# Write text to the email field
driver.find_element(By.XPATH, '//input[@id="email"]').send_keys("roni_cost@example.com") 

# Write text to the password field
driver.find_element(By.CSS_SELECTOR, 'input#Password').send_keys("roni_cost3@example.com")

# Click the sign in button
driver.find_element(By.XPATH, "//span[text()='Sign-in to Your Account']/following::span[text()='Sign In']").click()

time.sleep(10)


# Switch to the iframe
driver.switch_to.frame(driver.find_element(By.XPATH, "//iframe[contains(@id,'braintree-hosted-field-number')]"))

# Write text to the input field
driver.find_element(By.XPATH, '//input').send_keys("1234")

time.sleep(10)

# Switch back to the main content
driver.switch_to.default_content()
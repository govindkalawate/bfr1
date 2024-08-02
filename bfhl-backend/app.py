# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Add this line to enable CORS

@app.route('/bfhl', methods=['POST'])
def bfhl():
    data = request.json.get('data', [])
    alphabets = [char for char in data if char.isalpha()]
    numbers = [char for char in data if char.isdigit()]
    highest_alphabet = sorted(alphabets)[-1:] if alphabets else []
    
    response = {
        "alphabets": alphabets,
        "numbers": numbers,
        "highest_alphabet": highest_alphabet,
        "email": "ga3211@srmist.edu.in",
        "roll_number": "RA2111033010048",
        "is_success": True
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)

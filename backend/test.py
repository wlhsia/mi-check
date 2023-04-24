import win32security

username = 'N000171574'
password = 'Apple0307'

try:
    win32security.LogonUser(username,'TWFPG', password, win32security.LOGON32_LOGON_NETWORK, win32security.LOGON32_PROVIDER_DEFAULT)
    access_token = create_access_token(identity=username)
    set_access_cookies(response, access_token)
    print('T')
except:
    print('F')
    return jsonify({"msg": "Bad username or password"}), 401

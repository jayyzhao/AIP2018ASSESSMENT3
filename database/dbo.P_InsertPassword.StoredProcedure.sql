USE [book-a-table]
GO
/****** Object:  StoredProcedure [dbo].[P_InsertPassword]    Script Date: 20/08/2018 7:36:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[P_InsertPassword] -- 'bbbbb', 3
@password_raw varchar(max),
@user varchar(max)
as
begin
    
	DELETE FROM dbo.PASSWORDS
	WHERE USERS_ID = @user 

    INSERT INTO dbo.passwords
	(USERS_ID, Password)
	VALUES
	(@user, @password_raw)

	OPEN SYMMETRIC KEY Password_Key  
   DECRYPTION BY CERTIFICATE PasswordsCertificate;  

	UPDATE dbo.Passwords  
    SET password_encrypted = EncryptByKey(Key_GUID('Password_Key')  
    , password, 1, HashBytes('SHA1', CONVERT( varbinary  
    , PASSWORDS_ID)))
    WHERE USERS_ID = @user;   

	UPDATE dbo.passwords
	SET [Password] = ''
	WHERE USERS_ID = @user;

	SELECT 'SUCCESS'

end
GO

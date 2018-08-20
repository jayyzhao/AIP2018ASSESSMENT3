USE [book-a-table]
GO
/****** Object:  StoredProcedure [dbo].[P_CheckPassword]    Script Date: 20/08/2018 7:36:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--P_CheckPassword 'bbbbb', 3
--P_CheckPassword 'BBBBB', 3


CREATE PROCEDURE [dbo].[P_CheckPassword]
@password_raw varchar(max),
@user varchar(max)
as
begin
    
	declare @password_unencrypted nvarchar(max)

	OPEN SYMMETRIC KEY Password_Key  
    DECRYPTION BY CERTIFICATE PasswordsCertificate;  
 
    set @password_unencrypted =
    (SELECT CONVERT(nvarchar,  
    DecryptByKey(Password_encrypted, 1 ,   
    HashBytes('SHA1', CONVERT(varbinary, passwords_id))))  
    AS 'Decrypted card number'
	FROM dbo.PASSWORDS
	where USERS_ID = @user)
    
	SELECT CASE WHEN @password_unencrypted = @password_raw COLLATE Latin1_General_CS_AS  THEN 'TRUE'
	       ELSE 'FALSE' END AS RESULT
	



end
GO

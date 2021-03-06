USE [book-a-table]
GO
/****** Object:  StoredProcedure [dbo].[P_PRC_CheckPassword]    Script Date: 7/10/2018 9:22:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--P_CheckPassword 'bbbbb', 3
--P_CheckPassword 'BBBBB', 3


CREATE PROCEDURE [dbo].[P_PRC_CheckPassword]-- 'test', 'test'
--Password compare 
--De hash and collate for non caps
--26-18-2018 Created
@password_raw varchar(max),
@user varchar(max)
as
begin
    
	declare @password_unencrypted nvarchar(max)
	declare @user_id bigint = (select users_id from USERS where USERS_NAME = @user)

	OPEN SYMMETRIC KEY Password_Key  
    DECRYPTION BY CERTIFICATE PasswordsCertificate;  
 


    set @password_unencrypted =
    (SELECT CONVERT(nvarchar,  
    DecryptByKey(Password_encrypted, 1 ,   
    HashBytes('SHA1', CONVERT(varbinary, passwords_id))))  
    AS 'Decrypted card number'
	FROM dbo.PASSWORDS
	where USERS_ID = @user_id)
    
	SELECT CASE WHEN @password_unencrypted = @password_raw COLLATE Latin1_General_CS_AS  THEN 'TRUE'
	       ELSE 'FALSE' END AS RESULT
	



end
GO

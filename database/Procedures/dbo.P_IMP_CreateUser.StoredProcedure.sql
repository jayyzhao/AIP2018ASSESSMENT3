USE [book-a-table]
GO
/****** Object:  StoredProcedure [dbo].[P_IMP_CreateUser]    Script Date: 7/10/2018 9:22:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[P_IMP_CreateUser] 
--Checks if user already exists
--Inserts user details
--26-08-2018 Created

@USERS_NAME NVARCHAR(50),
@USERS_FIRST_NAME NVARCHAR(255),
@USERS_LAST_NAME NVARCHAR(255),
@USERS_PASSWORD NVARCHAR(255)
AS
BEGIN

    DECLARE @THIS_USERS_ID bigint
	DECLARE @PASS_RESULT nvarchar(255)

    IF((SELECT COUNT(*)
	    FROM USERS
	    WHERE USERS_NAME = @USERS_NAME COLLATE Latin1_General_CS_AS) >= 1)
	BEGIN
	    SELECT 'Error_Username_Used'
		Return
	END

	INSERT INTO USERS
	([USERS_NAME],
	 [USERS_FIRST_NAME],
	 [USERS_LAST_NAME])
	 VALUES
	(@USERS_NAME,
	 @USERS_FIRST_NAME,
	 @USERS_LAST_NAME);
	 Select @THIS_USERS_ID = Scope_Identity()

	 EXEC [dbo].[P_IMP_InsertPassword] @USERS_PASSWORD, @THIS_USERS_ID

	 IF (SELECT COUNT(*) FROM PASSWORDS WHERE USERS_ID = @THIS_USERS_ID) > 0
	 BEGIN
	     SELECT 'Success'
	 END
	 ELSE
	 BEGIN
	     SELECT 'ERROR_Password_Fail'
	 END

END


GO

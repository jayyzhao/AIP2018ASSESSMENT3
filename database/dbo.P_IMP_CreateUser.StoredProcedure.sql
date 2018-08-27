USE [book-a-table]
GO
/****** Object:  StoredProcedure [dbo].[P_IMP_CreateUser]    Script Date: 27/08/2018 8:32:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[P_IMP_CreateUser]
--Checks if user already exists
--Inserts user details
--to do: password creation here
--26-08-2018 Created

@USERS_NAME NVARCHAR(50),
@USERS_FIRST_NAME NVARCHAR(255),
@USERS_LAST_NAME NVARCHAR(255)
AS
BEGIN


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
	 @USERS_LAST_NAME)

	 SELECT 'Success'

END


GO

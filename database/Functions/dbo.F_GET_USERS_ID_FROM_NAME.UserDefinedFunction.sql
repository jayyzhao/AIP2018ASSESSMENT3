USE [book-a-table]
GO
/****** Object:  UserDefinedFunction [dbo].[F_GET_USERS_ID_FROM_NAME]    Script Date: 16/09/2018 6:32:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[F_GET_USERS_ID_FROM_NAME]
(@USERS_NAME varchar(50))
RETURNS BIGINT
AS
BEGIN

    RETURN (SELECT [USERS_ID]
	       FROM [dbo].[USERS]
		   WHERE [USERS_NAME] = @USERS_NAME)

END
GO

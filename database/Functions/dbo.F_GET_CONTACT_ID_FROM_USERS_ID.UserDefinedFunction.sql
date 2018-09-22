USE [book-a-table]
GO
/****** Object:  UserDefinedFunction [dbo].[F_GET_CONTACT_ID_FROM_USERS_ID]    Script Date: 23/09/2018 8:23:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[F_GET_CONTACT_ID_FROM_USERS_ID]
(@USERS_ID BIGINT)
RETURNS BIGINT
AS
BEGIN

    RETURN (SELECT [CONTACT_ID]
	       FROM [dbo].[CONTACT]
		   WHERE [USERS_ID] = @USERS_ID)

END
GO

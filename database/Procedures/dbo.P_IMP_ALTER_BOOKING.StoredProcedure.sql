USE [book-a-table]
GO
/****** Object:  StoredProcedure [dbo].[P_IMP_ALTER_BOOKING]    Script Date: 7/10/2018 9:22:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[P_IMP_ALTER_BOOKING]
@COUNT_PEOPLE INT,
@DATE_AND_TIME DATETIME,
@BOOKING_ID BIGINT
AS
BEGIN
    
	UPDATE [dbo].[BOOKING]
	SET [BOOKING_COUNT_PEOPLE] = @COUNT_PEOPLE,
	    [BOOKING_DATE_AND_TIME] = @DATE_AND_TIME
	WHERE [BOOKING_ID] = @BOOKING_ID
	    
 
END
GO

USE [book-a-table]
GO
/****** Object:  StoredProcedure [dbo].[P_IMP_Cancel_Booking]    Script Date: 23/09/2018 8:22:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[P_IMP_Cancel_Booking] @BOOKING_ID BIGINT
AS
BEGIN
    UPDATE [dbo].[BOOKING]
    SET [BOOKING_IS_ACTIVE] = 0
    WHERE [BOOKING_ID] = @BOOKING_ID
END
GO

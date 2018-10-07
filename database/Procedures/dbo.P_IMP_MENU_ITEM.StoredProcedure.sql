USE [book-a-table]
GO
/****** Object:  StoredProcedure [dbo].[P_IMP_MENU_ITEM]    Script Date: 7/10/2018 10:55:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[P_IMP_MENU_ITEM]
@MENU_ID BIGINT,
@MEAL_ID BIGINT
AS
BEGIN
INSERT INTO MENU_ITEM
(MENU_ID, MEAL_ID)
VALUES
(@MENU_ID, @MEAL_ID)
END
GO
